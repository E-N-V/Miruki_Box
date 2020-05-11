"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileView = async (req, res) => {
    let arr = {
        f_name: "a",
        s_name: "s",
        t_name: "s",
        email: "assHoleFinger",
    };
    return res.render("profile", { title: "Профиль", iUser: arr });
};
