using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _db { get; set; }
        private IMapper _mapper { get; set; }

        public CompanyController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        //CRUD


        //CREATE
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            Company newCompany = _mapper.Map<Company>(dto);
            await _db.Companies.AddAsync(newCompany);
            await _db.SaveChangesAsync();

            return Ok("Company Created");
        }

        //READ
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>>  GetCompanies()
        {
            var companies = await _db.Companies.OrderByDescending(q => q.CreatedAt).ToListAsync();
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);
        }

       

        //UPDATE


        //DELETE
    }
}
