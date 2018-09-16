using FinalProject.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class SocialNetwork
    {

        [Key]
        public int Id { get; set; }

        public SocialNetworkType Value { get; set; }

        public string LinkToProfile { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual InfluencerUser InfluencerUser { get; set; }
    }
}
