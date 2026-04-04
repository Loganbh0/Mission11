using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp) => _waterContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var totalProjects = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var multiplePass = new
            {
                Projects = something,
                TotalProjects = totalProjects
            };

            return Ok(multiplePass);
        }

        [HttpGet("projecttypes")]
        public IActionResult GetProjectTypes ()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project? newProject)
        {
            if (newProject == null)
            {
                return BadRequest("Request body could not be parsed as a project.");
            }

            newProject.ProjectId = 0;
            _waterContext.Projects.Add(newProject);
            _waterContext.SaveChanges();
            return Ok(newProject);
        }

        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            var existingProject = _waterContext.Projects.Find(projectId);
            if (existingProject == null)
            {
                return NotFound("Project not found");
            }
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
            
            _waterContext.Projects.Update(existingProject);
            _waterContext.SaveChanges();
            return Ok(existingProject);
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var existingProject = _waterContext.Projects.Find(projectId);
            if (existingProject == null)
            {
                return NotFound("Project not found");
            }
            _waterContext.Projects.Remove(existingProject);
            _waterContext.SaveChanges();
            return NoContent();
        }
    }
}
