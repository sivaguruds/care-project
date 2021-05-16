import account from "./account";

// LOGIN POST
const login = (data) => {
  return account.post("/api/v1/auth/login", data);
};

// SAMPLE GET API
const gravityProfileGet = (id) => {
    return account.get(`/api/v1/admins/profiles/${id}`);
};


const accountService = {
    login,
    gravityProfileGet
};

export default accountService;
