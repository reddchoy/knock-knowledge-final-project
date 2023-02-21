import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import Button from '../layout/Button';
import DataForm from './DataForm';

interface Props {
  table: string;
  data: any;
  refresh: (table: string) => void;
}

const DataList = ({ table, data, refresh }: Props) => {
  const [popup, setPopup] = useState('');
  const [clickData, setClickData] = useState(null);
  const disableCreate: boolean = table === 'Review' || table === 'Order' || table === 'User';

  const cleanPopup = () => {
    setClickData(null);
    setPopup('');
    refresh(table);
  };

  return (
    <>
      <div>
        <header>
          <div className="title">{table}</div>
          {!disableCreate ? (
            <Button
              txt="create"
              icon="bx-plus"
              reverse
              onButton={() => {
                setPopup('create');
                setClickData(data);
              }}
            />
          ) : (
            <div className="empty-btn"></div>
          )}
        </header>

        <table>
          <tbody>
            {
              data.map((x: any, i: any) => (
                <tr key={i}>
                  <th className="action">Edit</th>
                  {Object.keys(x).map((x: any, i: any) => (
                    <th key={i}>{x}</th>
                  ))}
                </tr>
              ))[0]
            }

            {React.Children.toArray(
              data
                .filter((x: any) => x.status !== 'off_board')
                .filter((x: any) => x.isActive !== false)
                .map((x: any, i: any) => {
                  return (
                    <tr key={i}>
                      <td className="action">
                        <i
                          className="bx bxs-edit click"
                          onClick={() => {
                            setClickData(x);
                            setPopup('edit');
                          }}
                        />
                      </td>
                      {Object.values(x).map((x: any, i: any) => {
                        switch (typeof x) {
                          case 'boolean':
                            return (
                              <td key={i}>
                                <div className="td-text">
                                  {typeof x === 'boolean' ? (
                                    x ? (
                                      <i className="bx bx-check true" />
                                    ) : (
                                      <i className="bx bx-x false" />
                                    )
                                  ) : (
                                    x
                                  )}
                                </div>
                              </td>
                            );
                          case 'string':
                            if (!isNaN(Date.parse(x)) && x === new Date(x).toISOString()) {
                              return (
                                <td key={i}>
                                  <div className="td-text">{moment(x).format('LLL')}</div>
                                </td>
                              );
                            } else {
                              return (
                                <td key={i}>
                                  <div className="td-text">{x}</div>
                                </td>
                              );
                            }
                          default:
                            return (
                              <td key={i}>
                                <div className="td-text">{x}</div>
                              </td>
                            );
                        }
                      })}
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
        {popup && (
          <div className="popup_bg">
            <div className="popup">
              {popup === 'edit' ? (
                <DataForm table={table} data={clickData} onClose={() => cleanPopup()} />
              ) : (
                <DataForm table={table} data={clickData} onClose={() => cleanPopup()} isCreate />
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 36px 0;
        }

        header .title {
          font-size: 36px;
          font-weight: bold;
        }

        table {
          width: 100%;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 24px;
        }

        tr,
        th,
        td {
          padding: 16px 24px;
          text-align: center;
        }
        th,
        tr:not(:last-child) td {
          border-bottom: 1px solid #eee;
        }
        th {
          text-transform: uppercase;
        }

        tr:first-child {
          background: #fff;
        }

        .action {
          padding: 16px 24px;
          position: sticky;
          left: 0;
          background: #faf7f6;
        }

        .action i {
          font-size: 18px;
        }

        th.action {
          background: #fff;
        }

        .click {
          cursor: pointer;
        }

        .click:hover {
          color: #666;
        }

        .action i {
          padding: 6px 12px;
        }

        .td-text {
          max-width: 200px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .true {
          color: #2a9d8f;
        }

        .false {
          color: #e76f51;
        }

        .popup_bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          background: rgb(0, 0, 0, 0.1);

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup {
          position: relative;
          max-width: 1358px;
          width: 95%;
          max-height: 95vh;
          background: rgba(255, 255, 255, 1);
          overflow-x: auto;
        }

        .empty-btn {
          height: 48px;
        }

        @media only screen and (max-width: 425px) {
          header {
            margin: 24px 0;
          }

          header .title {
            font-size: 32px;
          }

          tr,
          th,
          td {
            padding: 16px;
          }

          .action {
            padding: 12px 16px;
          }

          .action i {
            padding: 6px 0px;
          }

          .popup {
            max-height: 95vh;
          }
        }
      `}</style>
    </>
  );
};

export default DataList;
