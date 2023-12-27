const Group = require("../models/groups");

// Create group endpoint
const createGroup = async (req, res) => {
    try {
        const {
            title,
            userId
        } = req.body;

        // Check if title was entered
        if (!title) return res.json({
            error: "Title is required."
        });

        const group = await Group.create({
            title,
            userId
        });

        return res.json(group);
    } catch (error) {
        console.log(error);
    }
}

// Fetch group endpoint
const fetchGroups = async (req, res) => {
    const id = req.params;
    try {

        const foundData = await Group.find({userId: id}).toArray();

        if (!foundData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json(foundData);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createGroup,
    fetchGroups
}