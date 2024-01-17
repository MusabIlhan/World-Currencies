import {useEffect, useRef, useState} from "react";
import {fetchData} from "../../helpers";
import {useNavigate} from "react-router-dom";
import {Country} from "../../types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [savedCountries, setSavedCountries] = useState<Country[]>([]);
  const [sekAmount, setSekAmount] = useState(0);
  const selectRef = useRef<HTMLSelectElement>(null);
  const sessionToken = localStorage.getItem("sessionToken");
  const [sekRate, setSekRate] = useState(0);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!sessionToken) return navigate("/");

    fetchData(
      "/main/search",
      "POST",
      {
        input: searchInput,
      },
      sessionToken
    ).then((data) => {
      setSearchResults(data.countries ?? []);
      setSekRate(data.sekCurrency.rate ?? 0);
    });
  };

  const handleSave = () => {
    const selectedCountryName = selectRef.current?.value;
    if (
      !selectedCountryName ||
      savedCountries.find((country) => country.name === selectedCountryName)
    ) {
      return;
    }

    const selectedCountry = searchResults.find(
      (country) => country.name === selectedCountryName
    );

    if (!selectedCountry) return alert("Something went terribly wrong"); // TODO: replace
    setSavedCountries((prev) => {
      const result = [...prev, selectedCountry];

      localStorage.setItem("savedCountries", JSON.stringify(result));
      return result;
    });
  };

  useEffect(() => {
    const savedCountries = localStorage.getItem("savedCountries");
    if (savedCountries) {
      setSavedCountries(JSON.parse(savedCountries));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        gap: 40,
      }}
    >
      <div style={{display: "flex", flexDirection: "column", gap: 40}}>
        <form style={{display: "flex", flexDirection: "column", gap: 10}}>
          <input
            type="text"
            placeholder="Search for a country to add to your list"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
        </form>
        {searchResults.length > 0 && (
          <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <select ref={selectRef}>
              {searchResults.map((country: any) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <button onClick={handleSave}>Add to my list</button>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {savedCountries.length > 0 && (
          <form style={{display: "flex", gap: 10}}>
            <input
              type="number"
              placeholder="Enter SEK amount to convert"
              value={sekAmount}
              onChange={(e) => setSekAmount(parseInt(e.target.value))}
            />
          </form>
        )}
        <div
          style={{
            backgroundColor: "black",
            opacity: 0.4,
            width: "100%",
            padding: 10,
            gap: 20,
            display: "flex",
          }}
        >
          {savedCountries.map((country) => (
            <div
              style={{
                backgroundColor: "white",
                opacity: 0.6,
                padding: 10,
              }}
              key={country.name}
            >
              <div>{country.name}</div>
              <div>{country.population}</div>
              <div>
                Currencies:
                {country.currencies.map((currency) => {
                  return (
                    <div key={country.name}>
                      {sekAmount} SEK is equal to{" "}
                      {(sekAmount / sekRate) * currency.rate} {currency.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
