import Loading from "../../components/Loading/Loading";
import { useFetchData } from "../../hooks/useFetchData";

function AllReport() {
  const { data, loading } = useFetchData(
    "https://mtsbackend20-production.up.railway.app/reports/all",
  );

  if (loading) return <Loading />;

  console.log(data);

  return (
    <>
      <table className="">
        <thead>
          <tr>
            <td>Promotion Cost</td>
            <td>Special Order Cost</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>{}</p>
              <p>{}</p>
            </td>
            <td>
              <p>{}</p>
              <p>{}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default AllReport;
