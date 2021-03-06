const clubModel = require("../Models/clubModel");
const userModel = require("../Models/userModel");

//readPost
// module.exports.readclub = (req, res) => {
//   clubModel
//     .find((err, docs) => {
//       if (!err) res.send(docs);
//       else console.log("Error to get data : " + err);
//     })
//     .sort({ createdAt: -1 });
// };

module.exports.clubInfo = async (req, res) => {
  try {
    const club = await clubModel
      .findById({ _id: req.params.id })
      .populate("createrId");
    res.send(club);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createClub = async (req, res) => {
  const newClub = new clubModel({
    createrId: req.body.createrId,
    clubName: req.body.clubName,
    clubCategorie: req.body.clubCategorie,
    clubDescription: req.body.clubDescription,
    clubLocatioun: req.body.clubLocatioun,
    clubPhone: req.body.clubPhone,
    clubEmail: req.body.clubEmail,
    clubWebSite: req.body.clubWebSite,
  });

  try {
    const club = await newClub.save();
    // add to the follower list
    await userModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { userClubs: club._id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    return res.status(201).json(club);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.AllClubsInfo = async (req, res) => {
  try {
    const club = await clubModel.find().select();
    res.send(club);
    console.log("clubs", club);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteClub = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await clubModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
    await userModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { userClubs: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};
