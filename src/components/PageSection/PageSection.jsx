import React, { useEffect, useState } from "react";
import "./PageSection.css";
import axios from "axios";

import LoginCard from "../LoginCard/LoginCard";
import Header from "../Header/Header";
import VotingPage from "../VotingPage/VotingPage";
import ItemCard from "../ItemCard/ItemCard";
import AdminPage from "../AdminPage/AdminPage";

function PageSection(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [votingOptions, setVotingOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setIsLoggedIn(() => {
        return true;
      });

      const parsedUserData = JSON.parse(localStorage.getItem("userData"));

      setUserData(() => {
        // return JSON.parse(localStorage.getItem("userData"));
        return parsedUserData;
      });
      setIsAdmin(() => {
        return parsedUserData.isAdmin;
      });

      if(localStorage.getItem("currentPage").length > 0){
        setCurrentPage(localStorage.getItem("currentPage"));
      }
    }

    // getItems();
  }, []);

  // //updates localStorage based on currentPage value
  // useEffect(()=>{
  //   localStorage.setItem("currentPage");
  // },[currentPage])

  const getItems = async () => {
    axios
      .get(
        "https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/votingOptions"
      )
      .then((response) => {
        console.log(response.data);
        setVotingOptions(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    console.log("voting options: ", votingOptions);
  }, [votingOptions]);

  const logIn = () => {
    setIsLoggedIn(() => {
      return true;
    });
    setUserData(() => {
      return JSON.parse(localStorage.getItem("userData"));
    });

    getItems();

    setCurrentPage("votingPage")
    localStorage.setItem("currentPage", "votingPage");
    // console.log("SS LOGGED IN", userData);
  };

  const logOut = () => {
    setIsLoggedIn(() => {
      return false;
    });
    setUserData(() => {
      return "";
    });
    localStorage.clear();
    console.log("LOGGING OUT");
    setCurrentPage("");
    localStorage.setItem("currentPage", null);
  };

  const handleVote = async (e) => {
    const votingOptionId = e.target.id;

    const optionIndex = votingOptions.findIndex((option) => option.id === votingOptionId);

    const updatedVotingOptions = [...votingOptions];
    updatedVotingOptions[optionIndex].numOfVotes++;

    const updatedUserData = {
      ...userData,
      voted: true,
      votedTo: votingOptions[optionIndex],
    };

    setVotingOptions(() => {
      return updatedVotingOptions
    });
    setUserData((prevUserData) => {
      // Using the previous state ensures that we get the most up-to-date state
      const updatedUserDataWithPreviousState = {
        ...prevUserData,
        voted: true,
        votedTo: votingOptions[optionIndex],
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserDataWithPreviousState));
      return updatedUserDataWithPreviousState;});

    try {
      await axios.put(
        `https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/votingOptions/${votingOptionId}`,
        updatedVotingOptions[optionIndex]
      );

      await axios.put(
        `https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/users/${userData.id}`,
        updatedUserData
      );

      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      console.log('Vote added');

    } catch (error) {
      console.error(error.message);
    }

  }

  const handleChangeVote = async (e) => {
    const votingOptionId = e.target.id;

    const optionIndex = votingOptions.findIndex((option) => option.id === votingOptionId);

    const updatedVotingOptions = [...votingOptions];
    updatedVotingOptions[optionIndex].numOfVotes--;

    const updatedUserData = {
      ...userData,
      voted: false,
      votedTo: {},
    };

    setVotingOptions(() => {
      return updatedVotingOptions
    });
    setUserData((prevUserData) => {
      // Using the previous state ensures that we get the most up-to-date state
      const updatedUserDataWithPreviousState = {
        ...prevUserData,
        voted: false,
        votedTo: {},
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserDataWithPreviousState));
      return updatedUserDataWithPreviousState;});

    try {
      await axios.put(
        `https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/votingOptions/${votingOptionId}`,
        updatedVotingOptions[optionIndex]
      );

      await axios.put(
        `https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/users/${userData.id}`,
        updatedUserData
      );

      localStorage.setItem("userData", JSON.stringify(updatedUserData));

      console.log('Vote removed');

    } catch (error) {
      console.error(error.message);
    }
  }

  const handleAdminClick = () => {
    setCurrentPage(() => "adminPage")
    localStorage.setItem("currentPage", "adminPage");
  }

  const handleVotePageClick = () => {
    setCurrentPage(() => "votingPage");
    localStorage.setItem("currentPage", "votingPage");
  }

  return (
    <section className="page-section">
      {!isLoggedIn && <LoginCard logIn={logIn} />}

      {/* {isLoggedIn && userData.isAdmin && ( */}
      {currentPage === "votingPage" && userData.isAdmin && (
        <>
          <Header logOut={logOut} isAdmin={true} getItems={getItems} handleAdminClick={handleAdminClick}/>
          {votingOptions.length > 0 && (
            <VotingPage>
              {votingOptions.map((option, index)=>(
                <ItemCard key={index} id={option.id} name={option.name} imageLink={option.imageLink} numOfVotes={option.numOfVotes} handleVote={handleVote} userData={userData} handleChangeVote={handleChangeVote}/>
              ))}
            </VotingPage>
          )}
        </>
      )}

      {currentPage==="adminPage" && (
        <>
        <Header logOut={logOut} isAdmin={true} getItems={getItems} handleAdminClick={handleAdminClick} handleVotePageClick={handleVotePageClick}/>
        <AdminPage>

        </AdminPage>
        </>
      )}

      {/* {isLoggedIn && !userData.isAdmin && ( */}
      {currentPage === "votingPage" && !userData.isAdmin && (
        <>
          <Header logOut={logOut} isAdmin={false} getItems={getItems} handleAdminClick={handleAdminClick}/>
          <VotingPage>
              {votingOptions.map((option, index)=>(
                <ItemCard key={index} id={option.id} name={option.name} imageLink={option.imageLink} numOfVotes={option.numOfVotes} handleVote={handleVote} userData={userData} handleChangeVote={handleChangeVote}/>
              ))}
            </VotingPage>
        </>
      )}

      {props.children}
    </section>
  );
}

export default PageSection;
