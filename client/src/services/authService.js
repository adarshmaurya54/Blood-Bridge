const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();

  // Single if block for validation
  if (!email || !password || !role) {
    alert("Please provide all fields");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please provide a valid email address");
    return;
  }

  try {
    console.log("login", e, email, password, role);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organisationName,
  address,
  phone,
  hospitalName,
  website
) => {
  e.preventDefault();

  // Single if block for validation
  if (
    !role ||
    !email ||
    !password ||
    !address ||
    !phone ||
    !website ||
    !isValidEmail(email)
  ) {
    alert("Please provide all fields");
    return;
  }
  if (role === "organisation" && !organisationName) {
    alert("Please provide all fields");
    return;
  }
  if (role === "hospital" && !hospitalName) {
    alert("Please provide all fields");
    return;
  }
  if ((role === "admin" || role === "donor") && !name) {
    alert("Please provide all fields");
    return;
  }

  try {
    console.log(
      "register",
      e,
      name,
      role,
      email,
      password,
      organisationName,
      address,
      phone,
      hospitalName,
      website
    );
  } catch (error) {
    console.log(error);
  }
};
