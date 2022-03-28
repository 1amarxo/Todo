using Infrastucture;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Presentation.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly ToDoListAppDBContext context;
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly string Secret;
        public AccountController(ToDoListAppDBContext context,
                                 UserManager<IdentityUser> userManager,
                                 RoleManager<IdentityRole> roleManager,
                                 SignInManager<IdentityUser> signInManager,
                                 IConfiguration Configuration)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.Secret = Configuration["Secret"];
        }
        [HttpGet]
        [Route("ping")]

        public IActionResult Ping()
        {
            return Ok("Ping");
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> LogIn(AccountCredentialsDTO accountCredentials)
        {
            var user = await userManager.FindByEmailAsync(accountCredentials.Email);
            if (user == null)
            {
                return Unauthorized();

            }
            if (!await userManager.CheckPasswordAsync(user, accountCredentials.Password))
            {
                return Unauthorized();
            }
           

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.Secret);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Expires = DateTime.UtcNow.Add(TimeSpan.FromMinutes(5)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescription);
            var accessToken = tokenHandler.WriteToken(token);
            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                Token = accessToken
            });
        }

        [HttpPost]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(AccountCredentialsDTO accountCredentials)
        {
            var user = new IdentityUser
            {
                Email = accountCredentials.Email,
                UserName = accountCredentials.UserName
            };
            var result = await userManager.CreateAsync(user, accountCredentials.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok();
        }
    }
}
