import { State, City } from "country-state-city";

export const handleCountryChange = (country, setFunctions) => {
  const {
    setSelectedCountry,
    setSelectedState,
    setCityOptions,
    setFormData,
    setStateOptions,
  } = setFunctions;

  setSelectedCountry(country);
  setSelectedState(null);
  setCityOptions([]);
  setFormData((prev) => ({
    ...prev,
    address_details: { ...prev.address_details, country: country.label },
  }));

  const states = State.getStatesOfCountry(country.isoCode).map((state) => ({
    value: state.isoCode,
    label: state.name,
    isoCode: state.isoCode,
  }));
  setStateOptions(states);
};

export const handleStateChange = (state, setFunctions, selectedCountry) => {
  const { setSelectedState, setFormData, setCityOptions } = setFunctions;

  setSelectedState(state);
  setFormData((prev) => ({
    ...prev,
    address_details: { ...prev.address_details, state: state.label },
  }));

  const cities = City.getCitiesOfState(
    selectedCountry.isoCode,
    state.isoCode
  ).map((city) => ({
    value: city.name,
    label: city.name,
  }));
  setCityOptions(cities);
};

export const handleCityChange = (city, setFunctions) => {
  const { setSelectedCity, setFormData } = setFunctions;

  setSelectedCity(city);
  setFormData((prev) => ({
    ...prev,
    address_details: { ...prev.address_details, city: city.label },
  }));
};
