"use client";
import Modal from "@/components/ui/Modal";
import { getTransactions } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import TransactionDetails from "@/components/ui/modals/TransactionDetails";
import Loader from "@/components/ui/Loader";
import TableComponent from "@/components/TableComponent";
const Page = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState("My Transactions");

  let ModalContent;
  switch (modalType) {
    case "Transaction Details":
      ModalContent = <TransactionDetails data={rowData} />;
      break;

    default:
      ModalContent = null;
  }

  const handleModalOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleRowClick = (data) => {
    setRowData(data);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const path = list;
      const response = await getTransactions(path);
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleType = (type) => {
    const filtered = data.filter((item) => item.type === type);
    setFilteredData(filtered);
  };
  
  const tableData={
    tableHead:["Type","Amount","Creditor","Debitor","Updated At"],
    tableBody:["type","amount","creditor","debtor","updatedAt"]
  }

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
      <div className="flex gap-5 my-4">
        <button
          onClick={() => {
            setList("My Transactions");
          }}
          className={`text-nowrap text-center  rounded-md py-2 px-4 border-[1px] border-[#847697] focus:outline-none ${
            list === "My Transactions"
              ? "text-white bg-[#c4a5ff36]"
              : "text-[#dfdfdf7e] bg-[#c4a5ff22]"
          } `}
        >
          My Transactions
        </button>
        <button
          onClick={() => {
            setList("All Transactions");
          }}
          className={`text-nowrap text-center  rounded-md py-2 px-4 border-[1px] border-[#847697] focus:outline-none ${
            list === "All Transactions"
              ? "text-white bg-[#c4a5ff36]"
              : "text-[#dfdfdf7e] bg-[#c4a5ff22]"
          } `}
        >
          All Transactions
        </button>
      </div>
      <div className="w-full flex items-center justify-between my-2">
        <div className="w-[70%]">
          <div className="w-full flex shadow-lg items-center gap-2 text-white  rounded-md  font-extralight bg-[#dfdfdf1d] py-2 px-4 ">
            <div className="text-lg">
              <FiSearch />
            </div>
            <input
              name="search"
              className="focus:outline-none placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="text-white text-3xl  bg-[#c4a5ff36] rounded-md p-2 border-[1px] border-[#847697]">
              <IoOptions />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                handleType("recharge");
              }}
            >
              Recharge
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleType("redeem");
              }}
            >
              Redeem
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-y-auto">
        <TableComponent pageType="transaction" tableData={tableData} rowClick={handleRowClick} openModal={handleModalOpen} DashboardFetchedData={filteredData}/>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        {ModalContent}
      </Modal>
      <Loader show={loading} />
    </div>
  );
};

export default Page;
