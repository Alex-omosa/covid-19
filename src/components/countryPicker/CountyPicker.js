import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { countries } from "./../../api/index";
function CountyPicker({ handleCountryChange }) {
  const [country, setCountry] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      setCountry(await countries());
    };
    fetchCountries();
  }, [setCountry]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => {
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">Global</option>
        {country.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountyPicker;
