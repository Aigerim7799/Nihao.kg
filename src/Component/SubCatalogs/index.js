import React, { useState, useEffect } from "react";
import "./index.css";
import Plus from "./Plus.svg";
import Minus from "./Vector.svg";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchSubCatalog,
  fetchSecondSubCatalog,
  fetchThirdSubCatalog,
  fetchFourthSubCatalog,
} from "../../actions";

function SubCatalogs(props) {
  const value = props.data ? props.data : null;

  const [subCatalog, setSubCatalog] = useState();
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const getSubCatalog = (value) => {
    props.fetchSubCatalog(value);
    props.getSelectedId(value);
    setClick1(!click1);
  };
  const getSecondSubCatalog = (id) => {
    props.fetchSecondSubCatalog(id);
    setClick2(!click2);
    props.getCurrentId(id);
  };

  const getThirdSubCatalog = (id) => {
    props.fetchThirdSubCatalog(id);
    props.getThirdId(id);
    setClick3(!click3);
  };
  const getFourthSubCatalog = (id) => {
    props.fetchFourthSubCatalog(id);
    props.getFourthId(id);
    setClick4(!click4);
  };

  return (
    <div>
      <div
        className={
          "drop__down" +
          (click1 && props.selectedId == props?.data.Id ? " active" : " none")
        }
      >
        <div
          onClick={() => getSubCatalog(props?.data.Id)}
          className="drop__title"
        >
          <img
            src={click1 && props.selectedId == props?.data.Id ? Minus : Plus}
            alt=""
          />
          <p>{value.Name}</p>
        </div>
        <div
          style={
            click1 && props.selectedId == props?.data.Id
              ? { display: "flex" }
              : { display: "none" }
          }
          className="drop__list"
        >
          <ul
            style={
              click1 && props.selectedId == props?.data.Id
                ? { display: "list-item" }
                : { display: "none" }
            }
          >
            {props.subData
              ? props.subData &&
                props?.subData.map((el) => {
                  return (
                    <>
                      {el.ExternalId && el.ProviderType==='Alibaba1688'
                                      ||el.IsParent === false  ? (
                        <li
                          onClick={(e) => {
                            props?.getId(
                              el.ExternalId
                                ? el.ExternalId
                                : el.Id
                                ? el.Id
                                : el.ParentId,
                              el.Name
                            );
                          }}
                        >
                          {el ? el.Name : "wait please"}
                        </li>
                      ) : (
                        <>
                          {el.IsParent === true ? (
                            <div
                              onClick={() => getSecondSubCatalog(el.Id)}
                              className="drop__title"
                            >
                              <img
                                style={{ width: "18px", height: "18px" }}
                                src={
                                  click2 && props.currentId == el.Id
                                    ? Minus
                                    : Plus
                                }
                                alt=""
                              />
                              <p style={{ fontSize: "15px !important" }}>
                                {el.Name}
                              </p>
                            </div>
                          ) : null}
                          <ul
                            style={
                              click2 && props.currentId == el.Id
                                ? { display: "list-item" }
                                : { display: "none" }
                            }
                          >
                            {props?.secondSubData
                              ? props.secondSubData &&
                                props.secondSubData.map((element) => {
                                  return (
                                    <>
                                      {element.ExternalId &&
                                      element.ProviderType==='Alibaba1688'
                                      ||element.IsParent === false ? (
                                        <li
                                          onClick={(e) => {
                                            props.getId(
                                              element.ExternalId
                                                ? element.ExternalId
                                                : element.Id
                                                ? element.Id
                                                : element.ParentId,
                                              element.Name
                                            );
                                          }}
                                        >
                                          {element
                                            ? element.Name
                                            : "wait please"}
                                        </li>
                                      ) : (
                                        <>
                                          {element.IsParent === true && element.IsInternal===true ? (
                                            <div
                                              onClick={() =>
                                                getThirdSubCatalog(element?.Id)
                                              }
                                              className="drop__title"
                                            >
                                              <img
                                                style={{
                                                  width: "14px ",
                                                  height: "14px",
                                                }}
                                                src={
                                                  click3 &&
                                                  props.thirdId == element.Id
                                                    ? Minus
                                                    : Plus
                                                }
                                                alt=""
                                              />
                                              <p
                                                style={{
                                                  fontSize: "12px !important",
                                                }}
                                              >
                                                {element.Name}
                                              </p>
                                            </div>
                                          ) : null}
                                          <ul
                                            style={
                                              click3 &&
                                              props.thirdId == element.Id
                                                ? { display: "list-item" }
                                                : { display: "none" }
                                            }
                                          >
                                            {props?.thirdSubData
                                              ? props.thirdSubData &&
                                                props.thirdSubData.CategoryInfoList.Content.map(
                                                  (elem) => {
                                                    return (
                                                      <>
                                                        {elem.ExternalId &&
                                                        elem.IsParent ===
                                                          false  || element.IsInternal !== true ? (
                                                          <li
                                                            onClick={(e) => {
                                                              props.getId(
                                                                elem.ExternalId
                                                                  ? elem.ExternalId
                                                                  : elem.Id
                                                                  ? elem.Id
                                                                  : elem.ParentId,
                                                                elem.Name
                                                              );
                                                            }}
                                                          >
                                                            {elem
                                                              ? elem.Name
                                                              : "wait please"}
                                                          </li>
                                                        ) : (
                                                          <>
                                                            {elem.IsParent ===
                                                            true ? (
                                                              <div
                                                                onClick={() =>
                                                                  getFourthSubCatalog(
                                                                    elem?.Id
                                                                  )
                                                                }
                                                                className="drop__title"
                                                              >
                                                                <img
                                                                  style={{
                                                                    width:
                                                                      "14px ",
                                                                    height:
                                                                      "14px",
                                                                  }}
                                                                  src={
                                                                    click4 &&
                                                                    props.fourthId ==
                                                                      elem.Id
                                                                      ? Minus
                                                                      : Plus
                                                                  }
                                                                  alt=""
                                                                />
                                                                <p
                                                                  style={{
                                                                    fontSize:
                                                                      "12px !important",
                                                                  }}
                                                                >
                                                                  {elem.Name}
                                                                </p>
                                                              </div>
                                                            ) : null}
                                                            <ul
                                                              style={
                                                                click4 &&
                                                                props.fourthId ==
                                                                  elem.Id
                                                                  ? {
                                                                      display:
                                                                        "list-item",
                                                                    }
                                                                  : {
                                                                      display:
                                                                        "none",
                                                                    }
                                                              }
                                                            >
                                                              {props.fourthSubData
                                                                ? props.fourthSubData &&
                                                                  props.fourthSubData.CategoryInfoList.Content.map(
                                                                    (e) => {
                                                                      return (
                                                                        <>
                                                                          {e.ExternalId ? (
                                                                            <li
                                                                              onClick={(
                                                                                event
                                                                              ) => {
                                                                                props.getId(
                                                                                  e.ExternalId
                                                                                    ? e.ExternalId
                                                                                    : e.Id
                                                                                    ? e.Id
                                                                                    : e.ParentId,
                                                                                  e.Name
                                                                                );
                                                                              }}
                                                                            >
                                                                              {e
                                                                                ? e.Name
                                                                                : "wait please"}
                                                                            </li>
                                                                          ) : null}
                                                                        </>
                                                                      );
                                                                    }
                                                                  )
                                                                : null}
                                                            </ul>
                                                          </>
                                                        )}
                                                      </>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </ul>
                                        </>
                                      )}
                                    </>
                                  );
                                })
                              : null}
                          </ul>
                        </>
                      )}
                    </>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    subData: state.subCatalog[0],
    secondSubData: state.secondSubCatalog[0],
    thirdSubData: state?.thirdSubCatalog[0],
    fourthSubData: state.fourthSubCatalog[0],
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchSubCatalog,
      fetchSecondSubCatalog,
      fetchThirdSubCatalog,
      fetchFourthSubCatalog,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SubCatalogs);
