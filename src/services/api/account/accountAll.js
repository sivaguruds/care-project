import account from "./account";

// LOGIN POST
const login = (data) => {
  return account.post("/api/v1/auth/login", data);
};

// SAMPLE GET API
const gravityProfileGet = (id) => {
    return account.get(`/api/v1/admins/profiles/${id}`);
};

// *** COMMAN API *** //

// COUNTRY CODE API
const countryCode = () => {
  return account.get("/api/v1/country-code")
}

// LANGUAGE CODE API
const languageLoad = () => {
  return account.get("/api/v1/languages")
}

// LANGUAGE CODE API
const degreeNameLoad = () => {
  return account.get("/api/v1/doctor-degrees")
}

// ASSOICATE ORGANIZATION LIST CODE API
const organizationLoad = () => {
  return account.get("/api/v1/admins/doctors/suggestions")
}



const accountService = {
    login,
    gravityProfileGet,
    countryCode,
    languageLoad,
    organizationLoad,
    degreeNameLoad
};

export default accountService;
