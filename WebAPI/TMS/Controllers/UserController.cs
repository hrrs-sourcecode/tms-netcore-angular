using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TMS.Auth.Interfaces;
using TMS.DTO.Shared;

namespace TMS.Controllers
{
    public class UserController : Controller
    {
        private readonly IJwtTokenManager _jwtTokenManager;

        public UserController(IJwtTokenManager jwtTokenManager)
        {
            _jwtTokenManager = jwtTokenManager;
        }
        [AllowAnonymous]
        [Route("api/[controller]/authenticateasync")]
        [HttpPost]
        public async Task <IActionResult> Authenticate([FromBody]UserCredential userCredential)
        {

            UserClaim userClaim = await _jwtTokenManager.Authenticate(userCredential.UserName, userCredential.Password);
            if(string.IsNullOrEmpty(userClaim.Token))
            {
                return Unauthorized();
            }

            return Ok(userClaim);
        }
    }
}
