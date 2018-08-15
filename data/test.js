db.bandungcollection.aggregate(
  [
    {
      $match: {
        'planning': {
          $exists: true
        }
      }
    },
    {
      $count: "planning exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'buyer.id': {
          $exists: true
        }
      }
    },
    {
      $count: "buyer id exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'buyer.name': {
          $exists: true
        }
      }
    },
    {
      $count: "buyer name exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'tender.mainProcurementCategory': {
          $exists: true
        }
      }
    },
    {
      $count: "tender mainProcurementCategory exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'planning.budget.amount.amount': {
          $exists: true
        }
      }
    },
    {
      $count: "planning budget amount amount exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'planning.budget.description': {
          $exists: true
        }
      }
    },
    {
      $count: "planning budget description exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'planning.budget.project': {
          $exists: true
        }
      }
    },
    {
      $count: "planning budget project exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'tender.title': {
          $exists: true
        }
      }
    },
    {
      $count: "tender title exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'tender.milestones': {
          $exists: true
        }
      }
    },
    {
      $count: "tender milestone exists true"
    }
  ]
);

db.bandungcollection.aggregate(
  [
    {
      $match: {
        'tender.milestones.1': {
          $exists: true
        }
      }
    },
    {
      $count: "tender milestone array has data"
    }
  ]
);

db.bandungcollection.find(  { $and: [ { 'tender' : { $exists: true } }, {'tender.title': { $exists: true} } ] }  ).count()
