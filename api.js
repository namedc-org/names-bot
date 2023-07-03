const axios = require('axios');
const { api_token, token } = require('./config.json');


async function search(username) {
    try {

        res = await axios.get(`https://api.namedc.org/search?query=${username}`, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })

        if (res.status == 200) {
            return res.data;
        } else {
            return err.response.status;
        }

    }

    catch (err) {
        return err.response.status;
    }


}


//get user by id
async function getUser(id) {
    try {
        //send request to discord api
        res = await axios.get(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                "Authorization": `Bot ${token}`
            }
        })

        //return data
        return res.data;

    }

    catch (err) {
        return err.response.status;
    }


}



module.exports = {
    search,
    getUser
}