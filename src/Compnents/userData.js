import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function PersonalProfile() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    //get anime based on id
    const getUserData = async (user_id) => {
        try {
            console.log("fetching response");
            const response = await fetch(`http://127.0.0.1:8000/v1/user/${user_id}`);
            const data = await response.json();
            console.log(data?.result);
            if (data?.result?.profile_image == null) {
                data.result.profile_image = "data:image/jpeg;base64,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"
            }
            setProfileData(data?.result || {});
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
            setError("Please try again later");
        }
    };

    useEffect(() => {
        getUserData(id);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            <style>
                {`
            @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
            body{
                background-color: #f3f3f3;
            }
        `}
            </style>
            <Container>
                <Wrapper>
                    <LeftWrapper>
                        <ProfileImage src={profileData.profile_image} alt="user" />
                        <h4>{profileData.name}</h4>
                        <p>{profileData.current_location}</p>
                        <p>{profileData.about_me}</p>
                        <SocialMedia>
                            <h3>Social Media</h3>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </SocialMedia>
                    </LeftWrapper>
                    <RightWrapper>
                        <Info>
                            <h3>Information</h3>
                            <InfoData>
                                <Data>
                                    <h4>Phone</h4>
                                    <p>{profileData.mobile_number}</p>
                                </Data>
                                <Data>
                                    <h4>Email</h4>
                                    <p>{profileData.email}</p>
                                </Data>
                            </InfoData>
                        </Info>
                        <Info>
                            <InfoData>
                                <Data>
                                    <h4>Age</h4>
                                    <p>{profileData.dob}</p>
                                </Data>
                                <Data>
                                    <h4>Occupation</h4>
                                    <p>{profileData.occupation}</p>
                                </Data>
                            </InfoData>
                        </Info>
                        <Info>
                            <InfoData>
                                <Data>
                                    <h4>Marital Status</h4>
                                    <p>{profileData.marital_status}</p>
                                </Data>
                                <Data>
                                    <h4>Something</h4>
                                    <p>{profileData.occupation}</p>
                                </Data>
                            </InfoData>
                        </Info>
                        <Info>
                            <InfoData>
                                <Data>
                                    <h4>Location</h4>
                                    <p>{profileData.permanent_location}</p>
                                </Data>
                            </InfoData>
                        </Info>
                    </RightWrapper>
                </Wrapper>
                <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
            </Container>
        </>
    );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const ProfileHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const ProfileBio = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;


const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  width: 450px;
  display: flex;
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 450px;
  }
`;

const LeftWrapper = styled.div`
  width: 85%;
  background: linear-gradient(to right, #01a9ac, #01dbdf);
  padding: 30px 25px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  color: #fff;
  
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
`;

const RightWrapper = styled.div`
  width: 85%;
  background: #fff;
  padding: 30px 45px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0 0 5px 5px;
    margin-top: -1px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
  width: 300px;
`;

const Info = styled.div`
  margin-bottom: 25px;

  h3 {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e0e0e0;
    color: #353c4e;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
`;

const InfoData = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Data = styled.div`
  width: 45%;

  h4 {
    color: #353c4e;
    margin-bottom: 5px;
  }

  p {
    font-size: 13px;
    margin-bottom: 10px;
    color: #919aa3;
  }
`;

const SocialMedia = styled.div`

  h3 {
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e0e0e0;
    color: #353c4e;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  ul {
    display: inline-block; 
    list-style: none;
    float: none
  }

  li {
    display: inline-block; 
    list-style-type: none;
    width: 45px;
    height: 45px;
    background: linear-gradient(to right, #01a9ac, #01dbdf);
    margin-right: 20px;
    margin-right: 20px;
    border-radius: 5px;
    text-align: center;
    line-height: 45px;
  }

  li a {
    color: #fff;
    display: block;
    font-size: 18px;
  }
`;

export default PersonalProfile;
