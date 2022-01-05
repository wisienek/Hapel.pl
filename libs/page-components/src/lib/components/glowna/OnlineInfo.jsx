import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { GoArrowDown, GoArrowBoth, GoArrowUp, GoLaw } from 'react-icons/go';

import { useEffect } from 'react';

const OnlineInfo = ({ data, help, getDailyInfo }) => {
  useEffect(() => {
    getDailyInfo();
  }, [help]);

  return (
    <div className="noTuch" id="graphControlls">
      {data ? (
        <>
          <OverlayTrigger placement="auto" overlay={<Tooltip>Maximum</Tooltip>}>
            <div id="max" className="icon-text">
              <GoArrowUp /> {data.max}
            </div>
          </OverlayTrigger>

          <div id="mid">
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>Średnia</Tooltip>}
            >
              <div id="avg" className="icon-text">
                <GoLaw /> {data.avg}
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>Mediana</Tooltip>}
            >
              <div id="med" className="icon-text">
                <GoArrowBoth /> {data.med}
              </div>
            </OverlayTrigger>
          </div>

          <OverlayTrigger placement="auto" overlay={<Tooltip>Minimum</Tooltip>}>
            <div id="min" className="icon-text">
              <GoArrowDown /> {data.min}
            </div>
          </OverlayTrigger>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default OnlineInfo;
