import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";
import Select from "react-select";
import ExampleComponent from "./ExampleComponent";
// import { useDao } from "../../../lib/hooks";
import { useDao } from "nouns-builder-components";
import { DaoDetails, SortDirection } from "types";
import {
  components,
  lilsDaoContracts,
  nounsDaoContracts,
  themes,
} from "../../data/constants";
import cx from "classnames";
import DaoLogo from "../shared/DaoLogo";
import { useBlockNumber } from "wagmi";

type Props = {
  collections: DaoDetails[];
  setSelectedDao: Function;
  selectedDao: string;
};
const formatOptionLabel = ({
  value,
  label,
  logo,
}: {
  value: string;
  label: string;
  logo: string;
}) => (
  <div className="flex flex-row items-center gap-2">
    <DaoLogo key={value} src={logo} />
    <p>{label}</p>
  </div>
);
const sidebarBorderClasses = "border-r border-slate-200";
const buttonClasses =
  "text-gray-900 bg-white border bg-slate-100 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
function ComponentPicker(props: Props) {
  const defaultDaoAddress = "0xdf9b7d26c8fc806b1ae6273684556761ff02d422";
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
  // const [selectedDao, setSelectedDao] = useState<string>(defaultDaoAddress); // defaults to builder DAO
  const [embedCode, setEmbedCode] = useState<string>("[temp embed code]");
  const [rows, setRows] = useState<number>(3);
  const [itemsPerRow, setItemsPerRow] = useState<number>(5);
  const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");
  const [maxProposals, setMaxProposals] = useState<number>(5);
  const [hideLabels, setHideLabels] = useState<boolean>(false);
  const [view, setView] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [daoData, setDaoData] = useState<any>();
  const dao = useDao();

  const updateEmbedCode = () => {
    setCopied(false);
    const theme = themes[selectedTheme];
    const component = components[selectedComponent];
    const dao = props.selectedDao;
    const embed = `<div data-builder-component="${
      components[selectedComponent].embedCodeName
    }"
    ${`data-builder-theme="${themes[selectedTheme]}"`}
        ${
          components[selectedComponent].opts?.includes("rows")
            ? `data-rows="${rows}"`
            : ""
        }
        ${
          components[selectedComponent].opts?.includes("itemsPerRow")
            ? `data-items-per-row="${itemsPerRow}"`
            : ""
        }
        ${
          components[selectedComponent].opts?.includes("sortDirection")
            ? `data-sort-direction="${sortDirection}"`
            : ""
        }
        ${
          components[selectedComponent].opts?.includes("hideLabels")
            ? `data-hide-labels="${hideLabels}"`
            : ""
        }
        
        />`;
    setEmbedCode(embed);
  };

  const handleCopy = () => {
    setCopied(true);
    setInterval(() => {
      setCopied(false);
    }, 3500);
  };
  const defaultSelectedDao = {
    value: "0xdf9b7d26c8fc806b1ae6273684556761ff02d422",
    label: "Builder DAO",
    logo: "https://ipfs.filebase.io/ipfs/bafybeieifu437zmpo74odis7pg34ch5svupd5reowpsbb35wih7327mnhy/unnamed.png",
  };
  const selectOptions = props.collections.map((collection) => {
    return {
      value: collection.collectionAddress,
      label: collection.name,
      logo: collection.logo || "/placeholder.png",
    };
  });

  useEffect(() => {
    updateEmbedCode();
  }, [
    selectedTheme,
    selectedComponent,
    props.selectedDao,
    rows,
    itemsPerRow,
    sortDirection,
  ]);

  console.log("dao", dao);

  return (
    <div className="w-full px-3 md:px-10">
      <div className="mx-auto w-full max-w-screen-2xl rounded-lg border border-slate-200 bg-white">
        <div className="flex w-full md:flex-row">
          <div className="flex w-1/5 flex-col bg-slate-100">
            <div className={cx("px-4 py-3", sidebarBorderClasses)}>
              <p className="opacity-7 py-3 text-sm uppercase tracking-wide">
                Select DAO
              </p>
              <Select
                defaultValue={defaultSelectedDao}
                formatOptionLabel={formatOptionLabel}
                options={selectOptions}
                onChange={(e) =>
                  props.setSelectedDao(e?.value || defaultDaoAddress)
                }
              />
            </div>
            <div
              className={cx(
                "border-t border-t-slate-200 px-4 py-3",
                sidebarBorderClasses,
              )}
            >
              <p className="opacity-7 py-3 text-sm uppercase tracking-wide">
                Theme
              </p>
              {themes.map((theme, i) => (
                <button
                  className={cx(
                    "capitalize",
                    buttonClasses,
                    selectedTheme === i && {
                      "!border-slate-600 !bg-white": true,
                    },
                  )}
                  onClick={() => setSelectedTheme(i)}
                >
                  {theme}
                </button>
              ))}
            </div>

            <div className="flex w-full flex-col">
              <h2
                className={cx(
                  "border-t border-t-slate-200 px-4 py-3 text-sm uppercase tracking-wide opacity-70",
                  sidebarBorderClasses,
                )}
              >
                Select a component
              </h2>
              {components.map((component, i) => (
                <button
                  onClick={() => setSelectedComponent(i)}
                  className={cx(
                    "w-full border border-r-0 border-l-0 border-b-0 border-slate-200 bg-slate-100 px-4 py-3 text-left transition-all hover:bg-white",
                    sidebarBorderClasses,
                    selectedComponent === i &&
                      "!border-r-transparent !bg-white",
                  )}
                >
                  <span
                    className={cx(
                      "opacity-60",
                      selectedComponent === i && "opacity-100",
                    )}
                  >
                    {component.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-4/5">
            <div className="sticky border-b border-b-slate-200 py-3 px-5">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={`${selectedComponent + props.selectedDao}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-row items-center justify-between"
                >
                  {/* Options */}
                  <h2 className="text-xl font-normal">
                    {components[selectedComponent].name}
                  </h2>

                  <div className="flex flex-row gap-3">
                    {components[selectedComponent].opts?.includes(
                      "roundName",
                    ) && <input type="text" placeholder="Round name" />}
                    {components[selectedComponent].opts?.includes(
                      "sortDirection",
                    ) && (
                      <select
                        className="w-100% max-w-[150px] rounded-lg border border-slate-200 p-1 text-sm"
                        onChange={(e) =>
                          setSortDirection(e.target.value as "ASC" | "DESC")
                        }
                      >
                        <option value="DESC">Descending</option>
                        <option value="ASC">Ascending</option>
                      </select>
                    )}
                    {components[selectedComponent].opts?.includes(
                      "hideLabels",
                    ) && (
                      <div className="relative flex flex-col items-center justify-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                            onChange={() => setHideLabels(!hideLabels)}
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                        </label>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Hide labels
                        </span>
                      </div>
                    )}
                    {components[selectedComponent].opts?.includes(
                      "maxProposals",
                    ) && (
                      <div className="w-20">
                        <div className="relative mt-1 flex h-7 w-full flex-row rounded-lg border border-gray-300 bg-transparent bg-white">
                          <button
                            data-action="decrement"
                            className="h-full w-5 cursor-pointer rounded-l px-2 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                            onClick={() =>
                              maxProposals > 1 &&
                              setMaxProposals(maxProposals - 1)
                            }
                          >
                            <span className="text-md m-auto font-thin">−</span>
                          </button>
                          <input
                            type="number"
                            className="md:text-basecursor-default flex w-full items-center text-center text-sm text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none"
                            name="custom-input-number"
                            value={maxProposals}
                          ></input>
                          <button
                            data-action="increment"
                            className="h-full  w-5 cursor-pointer rounded-r px-2 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                            onClick={() => setMaxProposals(maxProposals + 1)}
                          >
                            <span className="text-md m-auto font-thin">+</span>
                          </button>
                        </div>
                        <label
                          htmlFor="custom-input-number"
                          className="block w-full text-center text-sm font-semibold text-gray-700"
                        >
                          Max props
                        </label>
                      </div>
                    )}

                    {components[selectedComponent].opts?.includes("rows") && (
                      <div className="w-20">
                        <div className="relative mt-1 flex h-7 w-full flex-row rounded-lg border border-gray-300 bg-transparent bg-white">
                          <button
                            data-action="decrement"
                            className="h-full w-5 cursor-pointer rounded-l px-2 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                            onClick={() => rows > 1 && setRows(rows - 1)}
                          >
                            <span className="text-md m-auto font-thin">−</span>
                          </button>
                          <input
                            type="number"
                            className="md:text-basecursor-default flex w-full items-center text-center text-sm text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none"
                            name="custom-input-number"
                            value={rows}
                          ></input>
                          <button
                            data-action="increment"
                            className="h-full  w-5 cursor-pointer rounded-r px-2 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                            onClick={() => setRows(rows + 1)}
                          >
                            <span className="text-md m-auto font-thin">+</span>
                          </button>
                        </div>
                        <label
                          htmlFor="custom-input-number"
                          className="block w-full text-center text-sm font-semibold text-gray-700"
                        >
                          Rows
                        </label>
                      </div>
                    )}
                    {components[selectedComponent].opts?.includes(
                      "itemsPerRow",
                    ) && (
                      <div className="w-20">
                        <div className="relative mt-1 flex h-7 w-full flex-row rounded-lg border border-gray-300 bg-transparent bg-white">
                          <button
                            data-action="decrement"
                            className="h-full w-5 cursor-pointer rounded-l px-2 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
                            onClick={() =>
                              itemsPerRow > 1 && setItemsPerRow(itemsPerRow - 1)
                            }
                          >
                            <span className="text-md m-auto font-thin">−</span>
                          </button>
                          <input
                            type="number"
                            className="md:text-basecursor-default flex w-full items-center text-center text-sm text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none"
                            name="custom-input-number"
                            value={itemsPerRow}
                          ></input>
                          <button
                            data-action="increment"
                            className="h-full  w-5 cursor-pointer rounded-r px-2 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                            onClick={() => setItemsPerRow(itemsPerRow + 1)}
                          >
                            <span className="text-md m-auto font-thin">+</span>
                          </button>
                        </div>
                        <label
                          htmlFor="custom-input-number"
                          className="block w-full text-center text-sm font-semibold text-gray-700"
                        >
                          Per row
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <CopyToClipboard
                      text={embedCode}
                      onCopy={() => handleCopy()}
                    >
                      <button
                        type="button"
                        className={cx(
                          "flex flex-row items-center gap-2",
                          buttonClasses,
                        )}
                      >
                        <IoCopyOutline />
                        Copy embed code
                      </button>
                    </CopyToClipboard>
                    <AnimatePresence>
                      {copied && (
                        <motion.p
                          className="text-normal absolute -bottom-[14px] left-0 w-full text-center text-sm opacity-60"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Copied
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="w-full">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={`${selectedComponent + props.selectedDao}`}
                  initial={{ opacity: 0, y: -25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { duration: 0.2 },
                  }}
                >
                  {dao && (
                    <ExampleComponent
                      componentIndex={selectedComponent}
                      themeIndex={selectedTheme}
                      rows={rows}
                      itemsPerRow={itemsPerRow}
                      sortDirection={sortDirection}
                      collectionAddress={props.selectedDao}
                      maxProposals={maxProposals}
                      hideLabels={hideLabels}
                      dao={dao}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentPicker;
