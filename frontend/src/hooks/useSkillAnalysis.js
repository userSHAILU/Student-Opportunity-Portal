import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

export const useSkillAnalysis = (userId) => {
  const [skills, setSkills] = useState([]);
  const { data: certificates } = useFetch('/certificates/my');

  useEffect(() => {
    if (certificates && Array.isArray(certificates)) {
      const uniqueSkills = [];
      const skillSet = new Set();

      certificates.forEach((cert) => {
        if (cert.skills && Array.isArray(cert.skills)) {
          cert.skills.forEach((skill) => {
            if (!skillSet.has(skill)) {
              skillSet.add(skill);
              uniqueSkills.push(skill);
            }
          });
        }
      });

      setSkills(uniqueSkills);
    }
  }, [certificates]);

  return skills;
};
