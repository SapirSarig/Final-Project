using FinalProject.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Interest
    {
        public int Id { get; set; }
        public string Value { get; set; }

        //public int UserId { get; set; }
        //[ForeignKey("UserId")]
        //public virtual User User { get; set; }


        //public int? AuctionId { get; set; }
        //[ForeignKey("AuctionId")]
        //public virtual Auction Auction { get; set; }

    }
}
