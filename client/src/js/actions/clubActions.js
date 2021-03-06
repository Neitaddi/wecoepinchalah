import axios from "axios";
import {
  GET_CLUBS,
  GET_CLUB,
  UPLOAD_PICTURE_CLUB,
} from "../constatnts/clubActionTypes";

//get All Clubs
// export const getClubs = () => {
//   (dispatch) => {
//     return axios
//       .get(`${process.env.REACT_APP_API_URL}api/club/`)
//       .then((res) => {
//         console.log("res", res);
//         dispatch({ type: GET_CLUBS, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };
export const getClubs = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/club/`)
      .then((res) => {
        dispatch({ type: GET_CLUBS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addClub = (
  createrId,
  clubName,
  clubCategorie,
  clubDescription,
  clubLocatioun,
  clubPhone,
  clubEmail,
  clubWebSite
) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/club/` + createrId,
    data: {
      createrId,
      clubName,
      clubCategorie,
      clubDescription,
      clubLocatioun,
      clubPhone,
      clubEmail,
      clubWebSite,
    },
  });
};
//get  Club
export const getClub = (cid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/club/${cid}`)
      .then((res) => {
        dispatch({ type: GET_CLUB, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPictureClub = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/club/upload/${id}`, data)
      .then((res) => {
        // if (res.data.errors) {
        //   dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        // } else {
        //   dispatch({ type: GET_USER_ERRORS, payload: "" });
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/club/${id}`)
          .then((res) => {
            console.log("datares", res.data);
            dispatch({
              type: UPLOAD_PICTURE_CLUB,
              payload: res.data.picture,
            });
          });
      })
      .catch((err) => console.log(err));
  };
};
// export const deleteclub = (clubId, createrId) => {
//   return (dispatch) => {
//     return axios({
//       method: "delete",
//       url: `${process.env.REACT_APP_API_URL}api/club/${clubId}`,
//       data: { id: createrId },
//     })
//       .then((res) => {
//         dispatch({ type: DELETE_POST, payload: { clubId, createrId } });
//       })
//       .catch((err) => console.log(err));
//   };
// };
