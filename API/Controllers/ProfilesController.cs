using System.Threading.Tasks;
using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UserDetails user)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { 
                UserDetails = new UserDetails {DisplayName = user.DisplayName, Bio = user.Bio}
            }));
        }
    }
}