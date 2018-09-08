using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinalProject.Entities.Enums;

namespace FinalProject.Entities
{
    public class Auction
    {
        public Auction()
        {
            //Offers = new HashSet<Offer>();
        }

        [Key]
        public int Id { get; set; }

        //public string Name { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual BusinessUser BusinessUser { get; set; }

        public string Title { get; set; }

        public string Product { get; set; }

        public string Description { get; set; }

        public string Picture { get; set; }

        //do we need a new hashset here??
        //public ICollection<Interest> Interests { get; set; }

        public int NumOfMinFollowers { get; set; }

        public double Payment { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        //public ICollection<Offer> Offers { get; set; }

    }
}
