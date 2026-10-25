"""Notifications endpoints: list, mark as read, and clear."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models import Notification, User

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/")
def list_notifications(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Retrieve all notifications, optionally filtered by user_id."""
    query = db.query(Notification)
    if user_id:
        query = query.filter(Notification.user_id == user_id)
        
    notifs = query.order_by(Notification.created_at.desc()).all()
    results = []
    for n in notifs:
        results.append({
            "id": n.id,
            "user_id": n.user_id,
            "title": n.title,
            "message": n.message,
            "notification_type": n.notification_type,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat() if n.created_at else None,
        })
    return results


@router.patch("/{notif_id}/read")
def mark_notification_read(notif_id: int, db: Session = Depends(get_db)):
    """Mark a single notification as read."""
    notif = db.query(Notification).filter(Notification.id == notif_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found.")
        
    notif.is_read = True
    db.commit()
    db.refresh(notif)
    return {"success": True, "id": notif.id, "is_read": True}


@router.patch("/read-all")
def mark_all_read(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    """Mark all notifications as read."""
    query = db.query(Notification)
    if user_id:
        query = query.filter(Notification.user_id == user_id)
        
    query.update({"is_read": True})
    db.commit()
    return {"success": True, "message": "All notifications marked as read."}
