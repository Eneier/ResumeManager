﻿using backend.Core.Entities;
using backend.Core.Enums;

namespace backend.Core.Dtos.Job
{
    public class JobCreateDto
    {

        public string Title { get; set; }
        public JobLevel Level { get; set; }
        //Relation
        public long CompanyId { get; set; }
    }
}