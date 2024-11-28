import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import countries from "../static/countries.json";

const Main = () => {
  const [valid, setValid] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [countryCode, setCountryCode] = useState(""); // Davlat kodi
  const [countryName, setCountryName] = useState(""); // Davlat nomi
  const password = useRef(null);
  const gender = useRef(null);
  const birthdate = useRef(null);
  const tel = useRef(null);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setCountryCode(code);

    // Davlat nomini JSON massivdan qidirish
    const country = countries.find((item) => item.code === code);
    setCountryName(country ? country.name : "Unknown Country");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setValid(true);

    if (edit) {
      if(data.some(item => item.username === username && item.id !== edit.id)) {
        setValid(false);
        //   alert("Username already exists. Please choose a different one.");
        return;
      }
      let updatedUser = {
        id: edit.id,
        firstname,
        lastname,
        username,
        password: password.current.value,
        gender: gender.current.value,
        birthdate: birthdate.current.value,
        country: countryName,
        countryCode: countryCode,
        tel: tel.current.value,
      };

      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );

      setEdit(null);
    } else {
      if (data.some((item) => item.username === username)) {
        setValid(false);
        //   alert("Username already exists. Please choose a different one.");
        return;
      }
      // console.log("create",countryName,countryCode)
      const newUser = {
        id: uuidv4(),
        firstname,
        lastname,
        username,
        password: password.current.value,
        gender: gender.current.value,
        birthdate: birthdate.current.value,
        country: countryName,
        countryCode: countryCode,
        tel: tel.current.value,
      };

      setData((prev) => [...prev, newUser]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    password.current.value = "";
    gender.current.value = "";
    birthdate.current.value = "";
    tel.current.value = "";
    setCountryName("");
    setCountryCode("");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete ?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setUsername(item.username);
    setCountryName(item.country);
    setCountryCode(item.countryCode);
    password.current.value = item.password;
    gender.current.value = item.gender;
    birthdate.current.value = item.birthdate;
    tel.current.value = item.tel;
    setEdit(item);
  };

  return (
    <div className="flex gap-5">
      <form
        className="w-80 p-5 bg-slate-200 h-screen"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className="w-full h-10 px-3 mb-3"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="firstname"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="lastname"
        />
        <label className={valid ? "hidden" : "block text-red-600 font-normal"}>
          Username already exists.
        </label>
        <input
          required
          className="w-full h-10 px-3 mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          ref={password}
          type="password"
          placeholder="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
        <br />
        <input
          className="bg-gray-50 w-full h-10 px-3 mb-3 border border-gray-300 text-white text-sm block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
          //   className="w-full h-10 px-3 mb-3"
          ref={tel}
          type="tel"
          pattern="[+]{1}[0-9]{3} [0-9]{9}"
          placeholder="+998 901234567"
          title="Eg: +998 985673412"
          maxLength="14"
        />
        <input
          className="bg-gray-50 w-full h-10 px-3 mb-3 border border-gray-300 text-white text-sm block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
          //   className="w-full h-10 px-3 mb-3"
          ref={birthdate}
          type="date"
          placeholder="birthdate"
        />

        <select
          id="countries"
          className="bg-gray-50 w-full h-10 px-3 mb-3 border border-gray-300 text-white text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleCountryChange}
          value={countryCode}
          required
        >
          <option value="">Select a country...</option>
          {countries.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className="bg-gray-50 w-full h-10 px-3 mb-3 border border-gray-300 text-white text-sm block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          ref={gender}
          required
        >
          <option value="">Please select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-Binary</option>
          <option value="other">Other</option>
          <option value="Prefer not to answer">Prefer not to Answer</option>
        </select>
        <button className="w-full h-10 px-3 mb-3 bg-blue-400">
          {edit ? "Update" : "Create"}
        </button>
      </form>
      <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-72 p-3 shadow text-center flex flex-col gap-2"
          >
            <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto"></div>
            <h3>{item.firstname}</h3>
            <h3>{item.lastname}</h3>
            <h3>{item.username}</h3>
            <p>{item.password.replace(/./g, "*")}</p>
            <p>{item.country}</p>
            <p>{item.gender}</p>
            <p>{item.birthdate}</p>
            <p>{item.tel}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-300 p-1 rounded-lg"
              >
                delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-300 p-1 rounded-lg"
              >
                edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

// let user = {
//   fname: "",
//   lname: "",
//   username: "", // unique
//   password: "", // min - 6
//   country: "",
//   gender: "",
//   birthdate: "",
//   tel: "",
// };
