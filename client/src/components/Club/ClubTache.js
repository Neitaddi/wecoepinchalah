import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClubs } from "../../js/actions/clubActions";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

// import "./Club.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FiHome } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";

// ........................................................

import { useDispatch, useSelector } from "react-redux";
// import { uploadPictureClub } from "../js/actions/clubActions";
import { BsPersonBoundingBox } from "react-icons/bs";

// ........................................................

const ClubTache = (props) => {
  const [clublist, setClublist] = useState({});
  const [photo, setPhoto] = useState("");
  // ..............................................

  // const idC = props.match.params.idC;
  const dispatch = useDispatch();
  // ...............................................

  useEffect(() => {
    props.getClubs().then(() => {});
  }, []);
  useEffect(() => {
    if (props.clubs) {
      setClublist(props.clubs);
    }
    // setPhoto(clublist.clubPicture);
  }, [props.clubs, photo]);

  // const uploadImage = (event) => {
  //   event.preventDefault();

  //   const image = new FormData();

  //   image.append("file", event.target.files[0]);
  //   image.append("upload_preset", "tyfhc3lt");
  //   axios
  //     .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
  //     .then(({ data }) => {
  //       setPhoto(data.url);
  //       clublist.clubPicture = data.url;
  //     })
  //     .then(() => {
  //       axios.patch(`http://localhost:5000/api/club/${idC}`, photo);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <div className="bgAcceuilCb">
        <div role="navigation" className="navLeftCb">
          {" "}
          <Link to="/">
            <img
              className="logoClub"
              src="/img/wecoepiLogo.png"
              alt="logo wecoepi"
            />
          </Link>
          <div className="image-up">
            <label htmlFor="imgInp" />
            <img id="blah" src={clublist.clubPicture} />
          </div>
          <div>{clublist.clubName}</div>
          {/* <div>{clublist.createrId._id}</div> */}
          {/* <SideBarProfilClub />
           */}
          {/* sidevar */}
          <nav className={"side-menu active"}>
            <ul className="side-menu-items">
              <li className="side-text">
                <Link to={"/club/" + clublist._id} className="linkP">
                  <FiHome className="icons" />
                  <span className="title">Acceuil</span>
                </Link>
              </li>
              <li className="side-text">
                <Link to={"/clubinfo/" + clublist._id} className="linkP">
                  <IoPersonOutline className="icons" />
                  <span className="title">Profil</span>
                </Link>
              </li>
              <li className="side-text">
                <Link to={"/clubdepartement/" + clublist._id} className="linkP">
                  <AiOutlineTeam className="icons" />
                  <span className="title">Départements</span>
                </Link>
              </li>
              <li className="side-text">
                <Link to={"/clubtaches/" + clublist._id} className="linkP">
                  <HiOutlineClipboardList className="icons" />
                  <span className="title">Tâches</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div role="main" className="navMiddleCb">
          {" "}
          {/* <div role="main" className="topCb">
            {" "}
          </div> */}
          <div role="main" className="buttomCb">
            <div>
              <h1>Taches</h1>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
ClubTache.propTypes = {
  getClubs: PropTypes.func,
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const idC = ownProps.match.params.idC;
  return { clubs: state.clubsRed.clubs.find((clubs) => clubs.idC === idC) };
};

export default connect(mapStateToProps, { getClubs })(ClubTache);