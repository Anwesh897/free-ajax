const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(members => members.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

router.post("/", (req, res) => {
  // res.send(req.body);
  const newMembers = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMembers.name || !newMembers.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }
  members.push(newMembers);
  res.json(members);
// res.redirect('/');
});

router.put("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(members => {
      if (members.id === parseInt(req.params.id)) {
        members.name = updMember.name ? updMember.name : members.name;
        members.email = updMember.email ? updMember.email : members.email;

        res.json({ msg: "Member updated", members });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some(members => members.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Members deleted",
      members: members.filter(members => members.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

module.exports = router;
