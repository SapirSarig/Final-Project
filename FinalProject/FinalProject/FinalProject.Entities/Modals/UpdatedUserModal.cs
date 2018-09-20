using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities.Modals
{
    public class UpdatedUserModal
    {
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        //db set?
        public virtual ICollection<Interest> Interests { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }

    }
}
