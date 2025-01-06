import React from 'react';
import { getFullName } from '../../utils/memberUtils';

const MemberLink = ({ member }) => {
  if (!member) return '-';
  return <a href={`/members/${member.id}`}>{getFullName(member)}</a>;
};

export default MemberLink;