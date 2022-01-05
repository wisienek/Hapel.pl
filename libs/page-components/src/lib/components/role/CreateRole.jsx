import React, { useState } from 'react';

import SRole from './SRole';

import axios from 'axios';

const CreateRole = ({ user, parsedRole, parsedRoleDC, addError }) => {
  const [create, setCreate] = useState({});
  const [add, setAdd] = useState({});

  const addRole = (data) => {
    if (!data || typeof data != 'object')
      return addError({
        type: 'danger',
        error: 'Zły obiekt zwrócony z kafelka!',
      });

    if (!data.name || data.name.length < 3)
      return addError({
        type: 'warning',
        error: 'Nazwa musi mieć przynajmniej 3 znaki niespecjalne.',
      });
    if (!data.dname) data.dname = `[&7${data.name}&f]`;
    if (data.permissions.length > 0)
      data.permissions = data.permissions.replace(/\s/g, '').split(',');
    if (
      data.newdc === true &&
      (!data.dcdisplayname || data.dcdisplayname.length < 3)
    )
      return addError({
        type: 'warning',
        error:
          'Nazwa roli na discordzie musi mieć minimum 3 znaki niespecjalne.',
      });

    axios
      .post(`http://hapel-ic.pl/api/role/nowy`, { user, params: data })
      .then((res) => {
        if (res.data) addError(res.data);

        console.log(`Zakończono zapytanie na tworzenie roli!`);
      })
      .catch((er) => {
        console.error(er);
        addError({ type: 'danger', error: 'Coś poszło nie tak! ' + er });
      });
  };

  const multiDcRole = () => {
    const role =
      (user && user.hasPerms
        ? parsedRoleDC
        : parsedRoleDC.filter((r) => r.permissions < 238542409)) || [];

    return role;
  };
  const mappedRoles = () => {
    return parsedRole.map((rola, ind) => (
      <option key={ind} value={rola}>
        {rola}
      </option>
    ));
  };

  return (
    <div className="content">
      <h1>Stwórz rolę</h1>
      <SRole
        user={user}
        mappedRoles={mappedRoles()}
        parsedRoleDC={parsedRoleDC}
        parsedRole={parsedRole}
        addRole={addRole}
        multiDcRole={multiDcRole}
        create={create}
        setCreate={setCreate}
        add={add}
        setAdd={setAdd}
        index={1}
      />
    </div>
  );
};

export default CreateRole;
