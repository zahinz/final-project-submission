import axios from "axios";
import moment from "moment";
import React from "react";

// redux
import { useSelector } from "react-redux";

// assets
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function WaitingPatient(props) {
  // get the token from redux
  const AuthToken = useSelector((state) => state.auth.currentUser.token);

  function updateStatus(status, waitingListId) {
    console.log(status, waitingListId);

    //   get the token for header
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/queue/finished/${waitingListId}`,
        {},
        config
      )
      .then(function (res) {
        console.log(res.data);
        window.location.reload(true);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className=" overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Queue Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time created
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {props.patients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.queue_number}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {patient.status === "finished" ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {patient.status}
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                            {patient.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(new Date(patient.created_at).getTime()).format(
                          " h:mm a"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {patient.status === "finished" ? null : (
                          <p
                            className="text-indigo-600 hover:text-indigo-900 text-xs cursor-pointer"
                            onClick={() => updateStatus("finished", patient.id)}
                          >
                            complete
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
