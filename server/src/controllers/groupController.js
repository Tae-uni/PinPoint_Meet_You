/* Asynchronous function & await.
   study about Asynchronous, Promise. */

const { Group } = require('../mongodb');
const upload = require('../middlewares/upload');
const fs = require('fs');
const path = require('path');

// searches for a group by its 'groupId' using the 'findById' method.
// groupId is from the client. not from the mongoDB.
async function findGroup(groupId) {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found.');
    }
    return group;
};

// Delete image from local storage
function deleteImage(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        } else {
            console.log(`Successfully deleted file: ${filePath}`);
        }
    });
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
            const pic = req.file ? '/uploads/' + req.file.filename : '';
            const newGroup = new Group({
                title,
                maxParticipants,
                description,
                pic, // File directory add.
                currentParticipants: 0,
                isFull: false
            });
            await newGroup.save();
            res.status(201).json({ message: "Group created successfully", group: newGroup });
            // res.redirect(`/groups/${newGroup._id}`); 
            // res.status(201).send({ message: "Group created sucessfully", group: newGroup });
            // res.redirect("/groups");
        } catch (error) {
            res.status(500).json({ message: "Failed to create group", error: error.message });
            // res.status(500).send({ message: "Failed to create group", error: error.message });
        }
    },

    async listGroup(req, res) {
        try {
            const groups = await Group.find({});
            res.render('groupList', { groups });
            //res.status(200).send(groups);
        } catch (error) {
            res.status(500).send({ message: "Failed to list groups", error: error.message });
        }
    },

    async getGroupDetails(req, res) {
        try {
            const group = await findGroup(req.params.groupId);
            if (!group) {
                res.status(404).send("Group not found");
            } else {
                res.render('groupDetails', { group });
            }
        } catch (error) {
            res.status(404).send({ message: "Group not found", error: error.message })
        }
    },

    // Rendering update group page
    async renderUpdateGroupPage(req, res) {
        try {
            const group = await findGroup(req.params.groupId);
            res.render('updateGroup', { group });
        } catch (error) {
            res.status(404).send("Group not found");
        }
    },

    // Group Update
    async updateGroup(req, res) {
        const groupId = req.params.groupId;
        const updateData = req.body;
        try {
            const group = await findGroup(groupId);
            for (const key in updateData) {
                if (Object.hasOwnProperty.call(updateData, key)) {
                    group[key] = updateData[key];
                }
            }
            if (req.file) {
                group.pic = '/uploads/' + req.file.filename;
            }
            // save group
            await group.save();
            res.redirect(`/groups/${groupId}`);
            // res.status(200).send({ message: "Group updated successfully", group });
        } catch (error) {
            console.error("Error updating group:", error.message);
            res.status(500).send({ message: "Error updating the group.", error:error.message });
        }
    },

    async deleteGroup(req, res) {
        const groupId = req.params.groupId;
        try {
            const group = await findGroup(groupId);
            // delete the pic before remove the group.
            if (group.pic) {
                const imagePath = path.join(__dirname, '../..', group.pic);
                deleteImage(imagePath);
            }

            await Group.findByIdAndDelete(groupId);
            res.redirect('/groups');
        } catch (error) {
            console.error("Error deleting group:", error.message);
            res.status(500).send({ message: "Error deleting the group.", error: error.message });
        }
    }
};

module.exports = groupController;