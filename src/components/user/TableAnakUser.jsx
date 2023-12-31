import React from 'react';
import { dummyData, tableHeader } from '../../utils/link';

import logoGraph from '../../images/dataanak/graph-anak.svg';
import logoPanah from '../../images/dataanak/Vector.svg';
import logoUser from '../../images/dataanak/User.svg';
import { convertUsia } from '../../utils/function';
import { useDispatch } from 'react-redux';
import { setGraph } from '../../features/kids/kids';
import { getSingleDataAnak } from '../../features/kids/kids';

const TableAnakUser = ({ style, graphShow, dataAnak }) => {
  const dispatch = useDispatch();
  const handleClick = async (id) => {
    await dispatch(setGraph(!graphShow));

    try {
      if (!graphShow) {
        await dispatch(getSingleDataAnak(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`relative lg:w-[35rem] xl:w-fit overflow-x-auto sm:rounded-lg mt-5  ${style}`}>
      <table className="w-3/4 text-sm text-left rtl:text-right text-greenPrimary bg-white shadow-md rounded-lg">
        <thead className="text-xs  uppercase text-greenPrimary border-b-2 border-grey ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            {tableHeader.map((header) => {
              return (
                <th scope="col" className="px-6 py-3 whitespace-nowrap " key={header.name}>
                  <div className="flex gap-5">
                    <img src={logoUser} alt="" />
                    <span>{header.name}</span>
                    <img src={logoPanah} alt="" />
                  </div>
                </th>
              );
            })}

            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>

        <tbody>
          {dataAnak?.map((child, index) => {
            const { nama, nik, tanggalLahir } = child.fields;
            const [year, month, day] = tanggalLahir.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            const usia = convertUsia(formattedDate);

            return (
              <tr key={child.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-lightGreen/30 ">
                <th scope="row" className="px-6 py-4 ">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{nik}</td>
                <td className="px-6 py-4 whitespace-nowrap">{nama}</td>
                <td className="px-6 py-4">{tanggalLahir}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usia}</td>
                <td className="items-start justify-center py-4 flex gap-2 px-4  ">
                  <button type="button" onClick={() => handleClick(child.id)}>
                    <img src={logoGraph} alt="logo graph" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableAnakUser;
