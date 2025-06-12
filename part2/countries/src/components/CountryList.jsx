import CountryDetails from "./CountryDetails";

const CountryList = ({
  countries,
  searchTerm,
  selectedCountry,
  setSelectedCountry,
}) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]} />;
  }
  
  if (selectedCountry !== null) {
      return <CountryDetails country={selectedCountry} />;
  }

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  if (selectedCountry !== null && filteredCountries.length === 0) {
    return <CountryDetails country={selectedCountry} />;
  }

  return (
    <div>
      {filteredCountries.length > 10 ? (
        <div>Too many matches, please narrow down your search.</div>
      ) : (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowDetails(country)}>Show</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;
// This component receives a list of countries as props and displays each country's name, population, and region.
