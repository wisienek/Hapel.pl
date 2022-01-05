import { useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

export const ChannelBar = () => {
  return (
    <div className='channel-bar shadow-lg'>
      <ChannelBlock />
      <div className='channel-container'>
        <Channel header='Topics' selections={topics} />
        <Channel header='Questions' selections={questions} />
        <Channel header='Random' selections={random} />
      </div>
    </div>
  );
};

const Channel = ({ header, selections }: { header: string, selections: string[] }) => {
  return (
    <div className='dropdown'>
        <h5
          className={'dropdown-header-text-selected'}
        >
          {header}
        </h5>
      {selections &&
        selections.map((selection: string) => <TopicSelection key={`sel-${selection}`} selection={selection} />)}
    </div>
  );
}

const Dropdown = ({ header, selections }: { header: string, selections: string[] }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
      </div>
      {expanded &&
        selections &&
        selections.map((selection: string) => <TopicSelection key={`sel-${selection}`} selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }: { expanded: boolean }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }: { selection: string }) => (
  <div className='dropdown-selection'>
    <BsHash size='24' className='text-gray-400' />
    <h5 className='dropdown-selection-text'>{selection}</h5>
  </div>
);

const ChannelBlock = () => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>Channels</h5>
  </div>
);