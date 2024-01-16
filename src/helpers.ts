export const fetchData = (
  path: string,
  method: "POST" | "GET",
  data: Record<string, string>
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  return fetch("http://localhost:3001" + path, options)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
