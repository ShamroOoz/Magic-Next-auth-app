const API = "/api/";

export async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { body: null, ...opts };

  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers,
  });

  if (res.status === 200) {
    return res.json();
  } else {
    let err = await res.json();
    throw err.error;
  }
}

const emailValidation = (email) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const validationChecker = (result) => {
  let errors = {};

  if (!Object.values(result).some(Boolean)) {
    errors.message = "Please fill all the fields....";
    return errors;
  }

  if (result.email && !emailValidation(result.email)) {
    errors.email = "Email is not valid!";
  }
  if (!result.password) {
    errors.password = "Password required!";
  }
  if (!result.email) {
    errors.email = "Email required!";
  }
  if (result.password && result.password.length < 8) {
    errors.password = "Password must be 8 characters long!";
  }

  return errors;
};
