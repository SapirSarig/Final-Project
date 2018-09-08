﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public abstract class User
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required, MinLength(6)]
        public string Password { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }

        //do we need a new hashset here??
        //public ICollection<Interest> Interests { get; set; }

    }
}