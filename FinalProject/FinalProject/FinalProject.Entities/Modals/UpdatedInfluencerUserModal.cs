using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities.Modals
{
    public class UpdatedInfluencerUserModal : UpdatedUserModal
    {
        public virtual ICollection<SocialNetwork> SocialNetworks { get; set; }
    }
}
