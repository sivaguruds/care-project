import account from "./account";

// LOGIN POST
const login = (data) => {
  return account.post("/api/v1/auth/login", data);
};

// SAMPLE GET API
const get = (id) => {
    return account.get(`/tutorials/${id}`);
};


const accountService = {
    login,
    get
};

export default accountService;
