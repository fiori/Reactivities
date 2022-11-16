using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>()
                .ForAllMembers(m => m.Condition((src, dest, srcMember) =>
                {
                    if (srcMember != null)
                    {
                        if (srcMember.GetType() == typeof(DateTime))
                            if ((DateTime)srcMember == default(DateTime))
                                return false;

                        return true;
                    }

                    return false;
                }));
        }
    }
}