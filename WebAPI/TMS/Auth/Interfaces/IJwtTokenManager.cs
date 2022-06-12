using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS.DTO.Shared;

namespace TMS.Auth.Interfaces
{
    public interface IJwtTokenManager
    {
        Task <UserClaim> Authenticate(string userName, string password);
    }
}
