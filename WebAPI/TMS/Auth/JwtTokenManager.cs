using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TMS.Auth.Interfaces;
using TMS.DTO.Shared;

namespace TMS.Auth
{
    public class JwtTokenManager : IJwtTokenManager
    {
        private readonly IConfiguration _configuration;

        public JwtTokenManager(IConfiguration configuration)
        {
           _configuration = configuration;
        }
        public async Task <UserClaim> Authenticate(string userName, string password)
        {
            UserClaim userClaim = await GetUserClaimFromRepository(userName);

            string testUser = "Harris";
            string testPass = "pass";

            if(userName == testUser && password == testPass)
            {
                string key = _configuration.GetValue<string>("JwtConfig:Key");
                byte[] keyByte = Encoding.ASCII.GetBytes(key);

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim(ClaimTypes.NameIdentifier, userName)
                    }),
                    Expires = DateTime.Now.AddMinutes(60),
                    SigningCredentials = new SigningCredentials
                    (
                        new SymmetricSecurityKey(keyByte),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };
                userClaim.Token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
            }
            
            return await Task.FromResult(userClaim);
        }

        private async Task<UserClaim> GetUserClaimFromRepository(string userName)
        {
            return await Task.FromResult(new UserClaim { UserName = userName });
        }
    }


}
