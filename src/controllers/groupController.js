/* Asynchronous function & await.
   study about Asynchronous, Promise. */

const { Group } = require('../mongodb');

// searches for a group by its 'groupId' using the 'findById' method.
// groupId is from the client. not from the mongoDB.
async function findGroup(groupId) {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found.');
    }
    return group;
};

/* Object literal, with two different async function. */
/* We can put async function inside of Object literal. It's common and useful. */
/* An object that will encapsulate all controller methods related to groups. */
const groupController = {
    async joinGroup(req,res) {
        // Bring the groupId from the request URL.
        const groupId = req.params.groupId;
        // Error handling with Try-Catch
        try {
            // findGroup is an async function. presumably queries the MongoDB usign the groupID.
            // It waits('await') for the result before moving on. If no group is found, it throws an error to 'catch' block.
            const group = await findGroup(groupId);

            if (group.isFull) {
                return res.status(400).send({ message: "This group is already full." });
            }

            if (group.currentParticipants < group.maxParticipants) {
                group.currentParticipants += 1;
                group.isFull = group.currentParticipants === group.maxParticipants;
                await group.save();
                res.status(200).send({ message: "This group is already full." });
                // res.send({ message: "You have successfully joined the group.", group });
            } else {
                res.status(400).send({ message: "No more participants can join." });
            }
        } catch (error) {
            console.error("Error joining group:", error.message);
            res.status(500).send({ message: "Error joining the group.", error: error.message });
        }
    },

    async leaveGroup(req, res) {
        const groupId = req.params.groupId;
        try {
            const group = await findGroup(groupId);

            if (group.currentParticipants > 0) {
                group.currentParticipants -= 1;
                group.isFull = group.currentParticipants >= group.maxParticipants;
                await group.save();
                res.status(200).send({ message: "Successfully left the group", group });
                // res.send({ message: "You have successfully left the group.", group });
            } else {
                res.status(400).send({ message: "There are no participants to remove." });
            }
        } catch (error) {
            console.error("Error leaving group:", error.message);
            res.status(500).send({ message: "Error leaving the group.", error: error.message });
        }
    },

    async createGroup(req, res) {
        const { title, maxParticipants, description } = req.body;
        try {
            const newGroup = new Group({
                title,
                maxParticipants,
                description,
                currentParticipants: 0,
                isFull: false
            });
            await newGroup.save();
            res.status(201).send({ message: "Group created sucessfully", group: newGroup });
            // res.redirect("/groups");
        } catch (error) {
            res.status(500).send({ message: "Failed to create group", error: error.message });
        }
    },

    async listGroup(req, res) {
        try {
            const groups = await Group.find({});
            res.status(200).send(groups);
        } catch (error) {
            res.status(500).send({ message: "Failed to list groups", error: error.message });
        }
    },

    async getGroupDetails(req, res) {
        try {
            const group = await findGroup(req.params.groupId);
            res.status(200).send(group);
        } catch (error) {
            res.status(404).send({ message: "Group not found", error: error.message })
        }
    }
};

module.exports = groupController;