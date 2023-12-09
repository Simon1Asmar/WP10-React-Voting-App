import React, { useEffect, useState } from "react";
import "./PageSection.css";
import axios from "axios";

import LoginCard from "../LoginCard/LoginCard";
import Header from "../Header/Header";
import VotingPage from "../VotingPage/VotingPage";
import ItemCard from "../ItemCard/ItemCard";

function PageSection(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [votingOptions, setVotingOptions] = useState([]);

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
    }
  }, []);

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
    if (userData && isLoggedIn) {
      getItems();
    }
  }, [userData]);

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
  };

  const handleVote = async (e) => {
    const votingOptionId = e.target.id;

    const optionIndex = votingOptions.findIndex((option) => option.id === votingOptionId);

    const updatedVotingOptions = [...votingOptions];
    updatedVotingOptions[optionIndex].numOfVotes++;

    setVotingOptions(updatedVotingOptions);

    try {
      await axios.put(
        `https://65745cd7f941bda3f2afa76c.mockapi.io/votingapp/votingOptions/${votingOptionId}`,
        updatedVotingOptions[optionIndex]
      );

      console.log('Vote added');

    } catch (error) {
      console.error(error.message);
    }
  

  }

  return (
    <section className="page-section">
      {!isLoggedIn && <LoginCard logIn={logIn} />}

      {isLoggedIn && userData.isAdmin && (
        <>
          <Header logOut={logOut} isAdmin={true} />
          {votingOptions.length > 0 && (
            <VotingPage>
              {votingOptions.map((option, index)=>(
                <ItemCard key={index} id={option.id} name={option.name} imageLink={option.imageLink} numOfVotes={option.numOfVotes} handleVote={handleVote}/>
              ))}
            </VotingPage>
          )}
        </>
      )}

      {isLoggedIn && !userData.isAdmin && (
        <>
          <Header logOut={logOut} isAdmin={false} />
          <VotingPage>{votingOptions.map()}</VotingPage>
        </>
      )}

      {props.children}
    </section>
  );
}

export default PageSection;
