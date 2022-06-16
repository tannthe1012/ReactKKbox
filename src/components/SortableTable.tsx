import { MouseEventHandler, useCallback, useState } from "react";
import data from "../data.json";

type Data = typeof data;
type sortkeys = keyof Data[0];

type sortorder = "ascn" | "desc";

function sortData({
  tableData,
  sortkey,
  reverse,
}: {
  tableData: Data;
  sortkey: sortkeys;
  reverse: boolean;
}) {
  if (!sortkey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortkey] > b[sortkey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortorder,
  columnKey,
  sortkey,
  onClick,
}: {
  sortorder: sortorder;
  columnKey: sortkeys;
  sortkey: sortkeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`${sortkey === columnKey && sortorder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
        }`}
    >
      ▲
    </button>
  );
}

function SortableTable() {
  const [sortkey, setsortkey] = useState<sortkeys>("last_name");
  const [sortorder, setsortorder] = useState<sortorder>("ascn");


  const headers: { key: sortkeys; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
    { key: "email", label: "Email" },
    { key: "gender", label: "Gender" },
    { key: "ip_address", label: "IP address" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortkey, reverse: sortorder === "desc" }),
    [data, sortkey, sortorder]
  );

  function changeSort(key: sortkeys) {
    setsortorder(sortorder === "ascn" ? "desc" : "ascn");

    setsortkey(key);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortorder,
                    sortkey,
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((person) => {
          return (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.first_name}</td>
              <td>{person.last_name}</td>
              <td>{person.email}</td>
              <td>{person.gender}</td>
              <td>{person.ip_address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortableTable;
